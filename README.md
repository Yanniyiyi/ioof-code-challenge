# ioof-code-challenge
## Date difference (I believe version-2 is better)
### How to run
Download the folder, run the index.html in browser.
### Assumptions
1. I assume that all the input is follow the 'DD MM YYYY' format. The day and month should always be a correct number. I only did validation on year.
2. Each pair of date is in a single line. 
3. Date pairs could be stored in a `txt` file as input. The format is as same as the user entered date pairs.
4. End date is not included in calculation.

### How to use

1. **From standard input**

Input date pairs like this:
```
11 01 1991, 11 02 1991
11 09 2001, 11 09 2011
11 10 2010, 11 02 1998
29 01 2010, 28 01 2001
31 03 1997, 31 05 1996
```
Then click the `run` button on the page.
Result is:
```
11 01 1991, 11 02 1991, 31
Invalide years in line 2 , year should be between 1990 and 2010
11 02 1998, 11 10 2010, 4625
28 01 2001, 29 01 2010, 3288
31 05 1996, 31 03 1997, 305
```

2. **From a txt file**

Click the `from file` radio button. Upload a `txt` file which stores date pairs in correct format (mentioned in assumptions). Run~~~

### What am I thinking, when I coding

1. The first method came into my mind is calculating how many years (leap year or not), how many month( how many days in this each month), how many days between to dates, then get a sum. 

2. Sorting is to comapre the year, month and day.

3. But! The code is not clean and the calculation is a little bit complex. As you can see in date-diff version 1.

4. So I started thinking about another way. 

   For a cutomized object, how to compre or do calculation?  

   When compare objects or do calculation, an object's valueOf method will be invoked.

5. I should return a number when compare two dates (yes, each date is a customized object). How could I get the number?

   In Javascript, Date's `getTime()` returns the number of milliseconds in a date since midnight of January 1, 1970.

   In this application, now the year's baseline is 1990. 

6. For each date object, I just calculate how many days passed since 01, 01, 1990.

7. Sorting or getting the date difference is easier now. 

## Robot toy

### How to run

Download the folder, run the index.html in browser.

### Assumptions

1. (0,0) is (left,bottom).
2. Show robot current status after each command if there is no error. But `report` command still could be used.
3. Command is **NOT** case sensitive.
4. Input is only from standard input which is an `input` element.

### How to use 

Available commands are listed in the page. Enter the command and **PRESS ENTER** on the keyboard.

### What am I thinking, when I coding

**Just do it!**

When rotate the robot, there are two ways. For example `right` means clockwise. So get an array, store all four directions in clockwise. When trun to `right`, `currentFacingDirectionIndex + 1` is index of the `newFacingDirectionIndex`. Because only four directions, when the `currentFacingDirectionIndex + 1 > 3`, set the index to 0. 
