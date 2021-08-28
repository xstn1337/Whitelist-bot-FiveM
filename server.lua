
local key = Config.LicenseKey

PerformHttpRequest("http://host/auth.php?key=" .. key, function(E, F, G)
		local P = json.decode(F)
        if P ~= nil then
            if P.Key == key and P.Blacklist == 'False' then
                print('auth success')
            else
                print('auth failed')
            end
            if P.Redeemed == 'False' then
                print('^1redeem your key please')
                Wait(2000)
                StopResource(GetCurrentResourceName())
            end
            if P.Blacklist == 'True' then
                print('you are blacklisted stopping server')
                Wait(2000)
                os.exit()
            end
        else
            print('auth failed')
        end
end, "GET", "", {
	version = "this"
})
