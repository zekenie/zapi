require 'rest-client'

api_url = "https://api.codetutor.me"
auth_token = ENV["HTTP_PASSWORD"]
test_file = "/Users/zekenierenberg/Documents/photo_export/IMG_0314\ \(3\).jpg"
RestClient.post(api_url+'/photos', { :photo => File.new(test_file,'rb') }, {:Authentication => auth_token})