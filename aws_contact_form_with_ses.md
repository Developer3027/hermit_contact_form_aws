# HTML Contact form with AWS Services

I previously created a landing page for Hermit Plus, in ReactJs, set it up in a S3 bucket to make it highly available, and distributed it world wide, while keeping the S3 bucket secured, with Cloudfront. Now I am going to add a contact form that uses AWS services as well. By the end of this article, we will have built a contact form in html, made it stylish with css, added functionality with javascript, created an api, created a Lambda function, set up SES, and brought it all together so that when a visitor fills out the form, a email is sent to you.

## Contact Form

I will start with the contact form. There are some that will question why I choose to to this in HTML. Why not be a pro, use React or Vue. I would ask, why not HTML? If you call yourself a web developer, then it is a tool in your tool box. Your tools are only kept sharp and shiny if you use them. If you are anything like me, your HTML tool will be hard to find, rusty, and very dull. So break it out, grab some WD-40 and some steel wool, your favorite sharpening stone, and let's get shinny.

I found a few posts and articles that laid out how to do what I wanted to do. The used a HTML form, and since it had been a bit since I had played with HTML, I decided to try it out. None of the articles worked for me.

### React Version

I had originally worked this up as a React component. I love React and Styled Components. So moving it over to HTML really wasn't difficult. Just some name changing and a touch of re-work. Like I said earlier, I am going to use the Hermit Plus project for this example. I will go over how and or why I did this or that. Please feel free to change things to best suit you. Here is the React code;

[React_Component](react_contact.jsx)

If you are new to React, there is a lot going on here. Let's break it down into sections. At the top I have imported React and the useState hook. Then I brought in Styled Components and finally, some images I created in Figma. Lines three through eight.

_*Note:*_ You can place your images in the public folder. React will see them there as well, but when you go to build the app, everything in the public folder will be used. I prefer to put them in a images folder in the src folder. This way, only the stuff used is kept.

Lines 11 through 19 are the state reference I needed. This form uses select buttons and so the choice function on lines twenty two through thirty one, get the selected value and puts it in state.

The handleSubmit function does some simple error checking and either sets a error message to display or a success message to display. It also gathers the form data in one object and logs it to the console for review.

Lines sixty through one hundred fifty four is the form. The left side gives information, while the right side is the actual form.

Lines one hundred fifty eight on to the end, are the styles for the form. I have commented each step of the way and I hope you find it helpful.

### HTML Version

The html file also has a lot going on. As you look through it, I encourage you to compare this to the React code. My process here was to first, copy the React code over, then remove all the stuff I didn't need.

[contact_html](html_contact.html)

In the head tag I have left in the meta tags and og info I used so you have a idea of how I do seo. This information is used by search and social bots. I use three online debug tools to ensure my sites look the way I want and fix certain errors. If you would like to review them, they are;

[Facebook](https://developers.facebook.com/tools/debug) debug tool

[Twitter](https://cards-dev.twitter.com/validator) debug tool

[LinkedIn](https://www.linkedin.com/post-inspector/inspect/) debug tool

Just put in the url of the site and press the button. Every site I work up, I use these tools once it is up and before I make an announcement. If I or someone is going to share it on a social site, I want it to look it's best.

Like I said earlier, the move was easy enough. The styled component at the bottom had the css. They also told me if it was a div or image or whatever. I just highlighted the name to wrap it in quotes, wrote div and class= in front and called it done. There was quit a bit of that.

Once I had the page looking like I wanted, it was responsive, and the javascript state worked, I got to work on setting up the aws services. Here is the css I used for the form;

[contact_css](css_contact.css)

## AWS S3

I need to touch base on S3 real quick. I previously set up the site on S3, but did not make it public. I kept it secure and used the CloudFront CDN network, with it's edge locations, to access the site and serve it up. All that falls outside this project. That made hosting the contact page super easy. I just simply uploaded it and the css to the root folder of the S3, right beside the index.html.

## Lambda function

AWS Lambda falls into the serverless category. The Lambda will take the data from the API, put it into the email and ship it to SES. I found a few articles that related to this in my research. A few were written in older versions of NodeJs and one written in Python. I wanted to make the Node work so that is what I focused on. Here is the function I came up with in the end;

[Lambda](lambda.js)

I made a role that included a few aws permissions so the function had permission to do the job I had given it. One was access to SES. This one allows the function to pass the info on to and interact with, SES. A Lambda execution role allows the Lambda to create logs. I am not currently using this but I thought it would be good to have when I do. Lastly there is the Lambda rol which allows the Lambda to invoke the function.

Notice the headers section, lines 13 and 14. The `'Access-Control-Allow-Origin': '*'` can give you a problem later on when you put all this together. This header tells the browser if it is ok to talk. The `'*'` is a wild card and blankets everything. Good for development, but not the most secure. If you run into issues with cors errors, this may be part of your problem.

## API Gateway

So the Lambda function is up, but how to get the information to it. That is were API Gateway come into play. Setting up the API gives us that connection. I set up a post method and attached the lambda function to it. I choose a public REST API and after creating the resource, the method and attached the Lambda, I enabled CORS. I removed everything but `'Content-Type'` from `'Access-Control-Allow-Headers'` field. In `'Access-Control-Allow-Origin'`, I left the `'*'` for testing on local.

Once all that is set up, I deployed so I could get the endpoint. With the endpoint I can finish making the post call in javascript in the index.html.

## SES

The last thing I did was register the email in SES. I have a name cheap account and I used that to create the email address. In SES I registered that email. Registering the emails was the only set up I did here. The Lambda function does all the heavy work.

AWS sets the email into a sandbox. The sandbox limits the amount of mails it forwards. For me this is a daily quota of 200 for a 24 hour period with a maximum send rate of 1 mail per second. When you are ready for production, sending the request is as easy as clicking a button.

## Conclusion

With all the pieces in place, I was able to run test mails from my local environment. Filled out the form and a few seconds later, _'bing, you have mail!'_

After I got the form and css uploaded to S3, I changed the `'*'` CORS settings. Because I use Cloudfront, I made sure to run an invalidation to clear the cache network.

I know this was not a step by step, but hopefully I have given you great information to aid in your build or debug a issue.
