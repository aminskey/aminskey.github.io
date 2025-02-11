---
title: "About Me"
description: "A bit about myself, what I specialize in, and what I can bring to the table"
menu:
  main:
    weight: 1
featured_image: "/graph.png"
---
## I am a highschool student that has good experience in the field of programming and solving problems.
Since I was a kid, I always had the knack for solving problems. Around the age of 10, I started to look into programming and computer Science. Since then I have been working on small projects, such as simple webscrapers and small mini-games. I mainly used to program in C. Here I would create projects like small IDEs, file readers and _as a matter of fact_ my own desktop program. I also found the structure of the linux operating system quite interesting. Although I wasn't an expert on it (still am not), I would always read about how processes and the linux kernel work together. 

| ![My editing program](/clip.png) |
|:--:|
| A screenshot of my editing program made in 2019 |

Now I have taken an interest in Machine Learning and Game Development. Although I am new to the field of AI, I have still managed to make some impressive projects.
1. Classifying handdrawn numbers from MNIST using a softmax classifier.
2. Identifying brain tumors using CNNs.
3. Using MSE to differentiate from images of plastics and non-plastics.
4. (Currently a work in progress) Predicting the future value of a cryptocurrency based on its 7-day track-history.

The projects mentioned above are of my latest achievements in the field of AI. The first project was a field study on how linear neural networks _work_. Here I wrote a paper, which consisted of 20 pages of pure content, on how linear classifiers work mathematically and how to implement them using frameworks like PyTorch. And yes, I managed to impress my teacher quite well.

| ![Classifying MNIST](/image.png) |
|:--:|
| A screenshot of a softmax classifier classifiying 28x28 images of handdrawn numbers |

The second project was more focused on the user-end side. Me and another individual were set out to create a portal for doctors who specialised in neurology and mainly detecting brain tumors. Based on the criteria of the assignment (such as only creating a prototype), we mainly focused on creating a catalogue of patients for each doctor and an option to scan his/hers corresponding MRI-scan. This was also written in python using PyTorch.

But before I even embarked on this journey, I made an early prototype of a plastic-sorting product. This was a group assignment mainly focusing on creating a product that would solve a specific issue. Our product was supposed to be a trash-sorting machine, that could based on the camera feed, classify the pieces of trash into different categories. 

This prototype could only differentiate between trash and plastic based on some training images. Although I was new to the field of AI and wasn't familiar with any ML frameworks, I made my own solution. I was going to compare the incoming camera feed with a list training images (images of plastic objects) using MSE. Obviously, these images needed to be preprocessed first. To put it in short terms, this is how I detected objects and preprocessed the images of said objects:
- Use OpenCV contour algorithm to detect shapes
- Warp the images perspectives
- Grayscale
- Highlight edges
- Due to noisy input, set a threshold value for pixels

Then I would compare the 2 preprocessed images to see they looked alike. I would do so, by seeing if the MSE score would be less than 1. Now when looking back at it, I must admit, it was a very sketchy solution, but the best one I had at the time. Here's a picture showing the program's ability to detect plastic.

| ![Detecting Plastic](/car_scan.png) |
|:--:|
| A screenshot of my algorithm detecting plastic |


The project that I am currently working on is still in the storyboard phase. The plan is to use coingecko's api to retrieve the value of a given cryptocurrency's value over a period of 7-days. Then, if we have time left, fit an ML model to the data and use it for prediction.

A lot of pros and cons follow this method, but it still hasn't left the whiteboard yet.

### What about games?
| {{<iframe src="/playableGames/pong-game/index.html" width="700" height="600">}} |
|:--:|
| A pong rivalry between 2 AI's |

I started my journey in game development back in 2021. One of the sole reasons I started programming was for the sake of entertainment. But this time I wanted to try something new. My first game was inspired by Geometry Dash with a mix of Sonic 2 aesthetic. Although it wasn't the best game, it still was quite fun and repetitive. Now I have refurnished that game and made it more user-friendly and easy to play.

During my time at the highschool, I have learned a lot about game design. One of our specialised subjects DDU, which stands for _Digital Design and Development_ (Dansk: **D**igital **D**esign og **U**dvikling) offers a deep study on these aspects of games. This goes from work management models like SCRUM and Double Diamond to MDA, Dieter Rams' heuristics and the Gestalt Principles. 

Each game shares a unique and thrilling experience and has a lot to offer. If you want to play some of those games, then check out the [Games Menu]({{<ref"/games">}} "Games Menu")