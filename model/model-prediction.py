import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras import backend as K

def contrastive_loss(y_true, y_pred):
    margin = 1
    y_true = K.cast(y_true, dtype=tf.float32)  # Cast y_true to float32
    return K.mean(y_true * K.square(y_pred) + (1 - y_true) * K.square(K.maximum(margin - y_pred, 0)))

# Define the custom_objects dictionary with the contrastive_loss function
custom_objects = {'contrastive_loss': contrastive_loss}

# Load the saved model with the custom loss function
siamese_model = load_model('siamese_model.h5', custom_objects=custom_objects)

# Set the input shape of the images
input_shape = (64, 64, 3)

# Load and preprocess two image files
image_file_1 = 'good.jpg'
image_file_2 = 'spectrogram.jpg'
image_1 = img_to_array(load_img(image_file_1, target_size=input_shape[:2])) / 255.0
image_2 = img_to_array(load_img(image_file_2, target_size=input_shape[:2])) / 255.0
image_1 = np.expand_dims(image_1, axis=0)
image_2 = np.expand_dims(image_2, axis=0)

# Predict the distance between the two images
distance = siamese_model.predict([image_1, image_2])
print('Distance:', distance)