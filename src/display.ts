import { execute, kill, tag, teleport, tellraw } from 'sandstone/commands';
import { MCFunction } from 'sandstone/core';
import { createObjective, rel, Selector } from 'sandstone/variables';

// TODO add coords of each warp to a scoreboard so that it will work also when the chunks are not loaded

// All launched ender pearls
const enderPearl = Selector("@e", {
  type: "minecraft:ender_pearl"
});

// All item frames containing and ender pearl
const warps = Selector("@e", {
  type: "minecraft:item_frame",
  nbt: { "Item": { "id": "minecraft:ender_pearl" } }
});

// the player goes "poof"
const poof = () => {
  execute.at("@p").run.particle("minecraft:poof", rel(0, 1, 0), [1, 1, 1], 0.5, 150);
};

// Function to execute for every item frame to match thier name with the thrown pearl
const eachItemFrame = MCFunction('eachitemframe', () => {
  // Store the pearl name in a temp storage
  execute.as("@e[tag=selectedpearl]").run.data.modify.storage("warpearl", "name").set.fromEntity("@s", "Item.tag.display.Name");
  // Set the scoreboard for this entity to 0 if it matches the name of the pearl in the temp storage
  execute.as("@s").store.success.score("@s", "warpselector").run.data.modify.storage("warpearl", "name").set.fromEntity("@s", "Item.tag.display.Name")
});

// Main function
// WARNING: runs each tick
MCFunction('warper', () => {
  // To be sure the scoreboard is active, I create it
  createObjective("warpselector");
  // For each pearl
  execute.as(enderPearl).ifData.entity("@s", "Item.tag.display.Name").run(() => {
    // Tag it with the selected tag
    tag("@s").add("selectedpearl");
    // Iterate over all the item frames holding named ender pearls
    execute.as(warps).at("@s")
      .ifData.entity("@s", "Item.tag.display.Name")
      .run(eachItemFrame);

    // If one is found with the same name
    execute.as(warps).ifScore("@s", "warpselector", "matches", 0).run(() => {
      poof();
      kill("@e[tag=selectedpearl]");
      teleport("@p", "@s");
      // Shows message "Warped to: $warp_name"
      tellraw("@p",
        [
          "",
          { "text": "Warped to: ", "bold": true, "italic": true, "color": "gold" },
          { "nbt": "name", "storage": "warpearl", "interpret": true, "underlined": true, "color": "blue" }
        ]
      )
      poof();
    });
  });
}, {
  runEachTick: true
})