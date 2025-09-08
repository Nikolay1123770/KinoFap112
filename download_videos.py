
import requests
import time

token = '7612817210:AAHexgyo6CVSwRhAcrlw12Se0V6pBu4Uv0A'  # Replace with your Bot's API token

# Get updates from the Telegram channel
def get_updates():
    url = f'https://api.telegram.org/bot{token}/getUpdates'
    response = requests.get(url)
    return response.json()

# Get file URL for a given file_id
def get_file_url(file_id):
    url = f'https://api.telegram.org/bot{token}/getFile?file_id={file_id}'
    response = requests.get(url)
    file_path = response.json()['result']['file_path']
    file_url = f'https://api.telegram.org/file/bot{token}/{file_path}'
    return file_url

# Download video from the URL and save it to the server
def download_video(file_url, save_path):
    response = requests.get(file_url)
    with open(save_path, 'wb') as file:
        file.write(response.content)

# Main function that checks for new videos and downloads them
def main():
    while True:
        updates = get_updates()
        for update in updates['result']:
            if 'message' in update and 'video' in update['message']:
                video_file_id = update['message']['video']['file_id']
                file_url = get_file_url(video_file_id)
                download_video(file_url, '/path/to/your/server/secret_folder/video.mp4')

        time.sleep(60)  # Check every 60 seconds

if __name__ == "__main__":
    main()
