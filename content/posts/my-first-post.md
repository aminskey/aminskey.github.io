---
date: '2025-02-10T11:52:34+01:00'
title: 'Image classification w/ softmax regression'
description: "A tutorial on how to use softmax regression to classify images"
featured_image: "/hospital.png"
draft: true
math: true
---
<style>
    code {
        background-color : "blue";
    }
</style>
Softmax regression is commonly known for transforming unreadable data into probabilites. These probabilites are measurements for how likely some given input is to match a certain class. Let's say that we have 3 classes; house, hospital and cottage. And based on an image of a structure, i.e. our input data, we compute its output via a linear transformation. 

For this tutorial we will only be using a linear neural network model. This type of model only consists of an input and output layer. Our input layer for this example contains about 784 input channels. This is because we are sending 28x28 pixel images as input, which becomes flattened and turns into a 1x784 vector. The number of outputs of our model are equal to the number of classes/categories in context to the classification process. 

| {{<img src="/hospital.png" alt="Hospital" width="200px">}} |
|:--:|
| A picture of a hospital |

We are able to turn the output from the model into the following probabilites: 10%, 67%, 23%. These probabilites are a form of measurement based on how much the image resembles the classes mentioned below. 

| Classes      |   House |  Hospital |  Cottage |
|:-------------|--------:|----------:|---------:|
| Probabilites |    23%  |    67%    |    10%   |

As you can see, our model thinks that the input resembles a hospital. What we are really missing right now, is 

But here we want to be able to implement our softmax function in a ML model. And as the title suggests, this function will be the center of it all. So let's create the blueprints of our model:
```diff
<--- The Big Plan --->
- Linear Model w/ 1x784 vector input (flattening 28x28 pixels images)
    - Transform the input via a linear transformation
- Softmax regression
    - Convert output into probabilites
- Cross Entropy Loss
    - Compare the probabilites with the data from the dataset and track loss
- Minibatch SGD
```