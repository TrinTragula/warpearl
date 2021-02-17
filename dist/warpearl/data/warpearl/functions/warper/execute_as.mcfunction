tag @s add selectedpearl
execute as @e[nbt={ Item: { id: 'minecraft:ender_pearl' } }, type=minecraft:item_frame] at @s if data entity @s Item.tag.display.Name run function warpearl:eachitemframe
execute as @e[nbt={ Item: { id: 'minecraft:ender_pearl' } }, type=minecraft:item_frame] if score @s warpselector matches 0 run function warpearl:warper/execute_as/execute_as