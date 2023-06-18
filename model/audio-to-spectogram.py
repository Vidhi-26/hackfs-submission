from moviepy.editor import VideoFileClip
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

video_path = 'user_sample.mp4'
output_path = 'user_generated.mp3'

video = VideoFileClip(video_path)
audio = video.audio
audio.write_audiofile(output_path)

# Load the MP3 song and extract its audio data
audio_path = 'user_generated.mp3'
y, sr = librosa.load(audio_path)

# Compute the spectrogram
spectrogram = librosa.feature.melspectrogram(y=y, sr=sr)
spectrogram_db = librosa.power_to_db(spectrogram, ref=np.max)

# Display the spectrogram without labels
plt.figure(figsize=(10, 4))
librosa.display.specshow(spectrogram_db, x_axis=None, y_axis=None)
plt.axis('off')

# Save the spectrogram as a JPEG file
output_path = 'spectrogram.jpg'
plt.savefig(output_path, format='jpg', bbox_inches='tight', pad_inches=0)

# Show the plot
# plt.show()