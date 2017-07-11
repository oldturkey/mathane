from random import *

b = []
count = 0
for i in range(0, 24):
    count = count + 1
    a = uniform(0.66, 0.72)
    a = round(a, 2)
    b.append(a)
print count
print b
