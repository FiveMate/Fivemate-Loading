-- Event when loading is complete
RegisterNUICallback('loadingComplete', function(data, cb)
    ShutdownLoadingScreenNui()
    cb('ok')
end)
