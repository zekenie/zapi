require 'rest-client'

api_url = "https://api.codetutor.me"
auth_token = ENV["HTTP_PASSWORD"]
# test_file = "/Users/zekenierenberg/Documents/photo_export/IMG_0314\ \(3\).jpg"
dir = ARGV.first
Dir[dir+'/*'].select {|file| file.include? 'jpg' }.each do |file|
  file = dir + '/' + file
  if File.file? file
    begin
      RestClient.post(api_url+'/photos', { :photo => File.new(file,'rb') }, {:Authentication => auth_token})
    rescue
      puts "had trouble with #{file}"
    end
  end
end
