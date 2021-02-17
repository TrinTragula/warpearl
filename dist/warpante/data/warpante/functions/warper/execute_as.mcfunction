tag @s add selectedpearl
tellraw @a "iterating"
execute as @e[nbt={ Item: { id: 'minecraft:ender_pearl' } }, type=minecraft:item_frame] run function warpante:eachitemframe
execute as @e[nbt={ Item: { id: 'minecraft:ender_pearl' } }, type=minecraft:item_frame] if score @s warpselector matches 0 run teleport @p @s
kill @e[tag=selectedpearl]