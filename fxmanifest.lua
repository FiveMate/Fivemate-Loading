fx_version 'cerulean'
game 'gta5'

author 'FiveMate https://discord.gg/63KHZ2WYhp'
description 'Fivemate Loading Screen'

loadscreen_manual_shutdown "yes"
loadscreen 'web/index.html'
loadscreen_cursor 'yes'

client_script 'client.lua'

files {
    'web/index.html',
    'web/styles.css',
    'web/script.js',
    'web/config.js',
    'web/music/*.mp3',
    'web/logo/logo.png',
}
