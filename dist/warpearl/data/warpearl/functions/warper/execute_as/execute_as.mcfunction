execute at @p run particle minecraft:poof ~ ~1 ~ 1 1 1 0.5 150
kill @e[tag=selectedpearl]
teleport @p @s
tellraw @p ["",{"text":"Warped to: ","bold":true,"italic":true,"color":"gold"},{"nbt":"name","storage":"warpearl","interpret":true,"underlined":true,"color":"blue"}]
execute at @p run particle minecraft:poof ~ ~1 ~ 1 1 1 0.5 150