import cv2
import numpy as np

# Set video properties
width, height = 640, 480
fps = 30
duration = 5  # in seconds

# Create a VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Use 'XVID' for AVI format
out = cv2.VideoWriter('random_video.mp4', fourcc, fps, (width, height))

# Generate frames
for t in range(fps * duration):
    # Create a frame with a random color (color changes over time)
    color = np.random.randint(0, 256, 3)
    frame = np.zeros((height, width, 3), dtype=np.uint8)
    frame[:] = color

    # Write the frame to the video
    out.write(frame)

# Release the VideoWriter
out.release()

print(f"Random video saved as 'random_video.mp4' ({duration} seconds).")
