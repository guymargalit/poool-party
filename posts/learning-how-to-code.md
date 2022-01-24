---
title: Learning How to Code
description: A lot of people have asked me how to get started learning how to code. There's a lot of opinions on this but here's mine. Make a website. It's fun and visual and is useful! Everyone should have their own website. But I also think you should be using all the new cool tools so let's do it.
date: '2022-01-24'
---

A lot of people have asked me how to get started learning how to code. There's a lot of opinions on how to get started but here's mine. **Make a website**. It's fun and visual and is useful! Everyone should have their own website. But I also think you should be using all the new cool tools so let's do it 🥳

1. Make a [Github](https://github.com/signup) account

> Github will be the place you "upload" your code to. You can decide to make it public or private. Most people make it public so that you can learn from others! Also called *open-source*.


2. Make a [Vercel](https://vercel.com/signup) account by clicking **Continue with Github**

>Vercel will be the place to setup your Website. Every time you update your code on Github, it will automatically put it up on your website! 

We're going to setup a website really quick with Next.js. What is that?

Ok quick lesson of some basic stuff to understand Next.js

Most websites have a combination of HTML, CSS, and JavaScript (not Java, that's different!)

**HTML** (Hypertext Markup Language) is the "bones" of your site. It's the structure of where everything goes.

**CSS** (Cascading Style Sheets) is the "clothes" of your site. It makes everything look pretty. If you want it to not look like a Word document, you'll need to "style" your site with it.

**JavaScript** is like the "actions" of your site. Say someone wants to "sign up" for your site or click on something and it does something, a lot of that is done with JavaScript!

To make JavaScript easier to use, smart people at Facebook invented **React** which is a "framework", basically an easier way to use JavaScript. Then some more smart people came along and wrote **Next.js** which is a "React framework".

Don't worry too much about understanding why you're using it for now. Just know it's the latest and greatest and a lot of people use it!

As you learn more, it will start to make sense why people use it 😊

Ok enough learning, let's make a website !

1. Go to **Vercel** and make a [new project](https://vercel.com/new). Click on Clone Template and use the normal Next.js site.

2. We're gonna create a "Git Repository" which is just a fancy way of saying a project on Github where your code will be.

Let's call it "website". Click "Create"!

It should make a website that sets up all the initial code for a Next.js site!

You should have a link to your site and you'll be able to find the code it made for you here: 

```
https://github.com/{YOUR_GITHUB_NAME}/website
```

Now you're probably thinking, "Ok sweet I have a website! But I want to edit it and not make it look like that..."

That's where coding comes in 🙂

First, we need a way to edit code. These days, you can setup a local development environment (fancy talk for getting coding apps for your computer) but super smart people made a way for you to be able to code, online!

They setup everything so you don't have to install anything and can get right to the coding!

We're gonna use [Gitpod](https://www.gitpod.io/#get-started)

Click "Continue with Github" and make an account.

What's really cool about Gitpod is that you can take any Github link, and open it with Gitpod with a really simple trick.

Just put "gitpod.io/#" in front of any Github repo and you can edit it!

Here's what it will look like for us:

```
gitpod.io/#https://github.com/{YOUR_GITHUB_NAME}/website
```

That's it!

It should open up a code editor that has all these different files. Don't worry about all of them, you'll learn one day 😊

The main file we care about is found in **pages/index.js**. Let's breakdown the file real quick.

We have stuff at the top that "imports" things. Basically anything that's not in this file and we want to use, we can "import". 

You'll notice we import a "styles" and it has ".css". That's important! That's our styling CSS file. We'll use it to make things more pretty later!

Then we have "export default function Home() {". That's some JavaScript, don't worry. It's a function and it really just lets us show the "HTML" we want.

Ok let's get to the **HTML**. If you don't know HTML, maybe just a quick overview of the basics. 

You have things called HTML "elements". These are seen in between the arrow brackets. For example we have `<div>`, `<title>`, `<main>`, `<h1>` etc. These are all different HTML elements that let us structure our page. You can learn more about them [here](https://www.w3schools.com/tags/default.asp).

You should know the basics, really not too bad. Only other thing to know is this. If we open an HTML block we need to close it too! Let's use `<div>` as it is one of the most common elements.

```html
<div>
    STUFF IN THE DIV
</div>
```

The first line starts the `<div>`, the second line has what's in the `<div>`, and the third line closes the `<div>`. So that means, if we "style" the div, anything INSIDE it will change.

But how do we "style" the div?

You'll see this is done for us already `className={styles.container}`. This goes to the styles file we imported and gets the styles for `styles.container`. Those look like this:

```css
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

Don't worry about all that, but all it is is CSS! You can learn that [here](https://web.dev/learn/css/box-model/).

There's a lot to CSS, but you'll learn more and more as you do it.

Let's have some fun and edit the site.

First of all, everything that's inside of the `<Head>` element, will not appear on the page. It's what appears at the top of the browser (like the title of the tab in Chrome or Safari). We can change `<title>Create Next App</title>` to be our name:

```html
<title>Guy Margalit</title>
```

You can also change the description if you want. 

```html
<meta name="description" content="My first website" />
```

Remember, these won't show up on your page cause they're in the `<Head>`

Let's actually change our site now. Delete all the stuff in the `<main>` div except for the `<h1>` at the top.

What you should be left with is this:

```html
<main className={styles.main}>
    <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
    </h1>
</main>
```


Let's delete the text in the `<h1>` and have it say our name:

```html
<h1 className={styles.title}>
   Guy Margalit
</h1>
```

Cool! It would be nice to see what's going on though. Good thing Gitpod let's us do that!

On the left bar in Gitpod, find the icon that says *Remote Explorer*. When you click on it, there should be Ports with 3000 open. We're gonna click on the globe icon and it will show us the site we're working on.

This site isn't "live", so don't worry! We're editing it and haven't uploaded our code anywhere. Before we upload our new code, let's change the color cause why not!

Go to the styles file in `styles/Home.module.css` and find `.title` it should look like this:

```css
.title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
}
```

We're gonna just add a color of purple to it so it's more fun:

```css
.title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    color: purple;
}
```

It should change on the explorer window you opened!

But we need to upload our code to our site. The way we do this is with Github but we can do it right from our code editor in Gitpod. 

There should be a tab that looks like some lines and circles. When you hover over it, it should say "Source Control". Click on it and it'll show all the changes we made. We're gonna write a message of what we changed (just for us to keep track) in the bar that says "Message (Enter to commit...)" and then click the Checkmark above it!

>If you see a popup that says, "There ar eno staged changes to commit. Would you like stage all your changes and commit them directly?", click "Yes"

Almost done, now click *Sync Changes* and it should send your new code to Github!

Now Vercel will detect that your Github code changed and it will automatically update your site with the new code!

If anything went wrong and didn't work, ask me for help 🥳

This should at least be a start to a free website with all the coolest latest tools. If you want to continue the coding journey and make your website cooler, learn some of these:

[HTML](https://www.learn-html.org/)

[CSS](https://web.dev/learn/css/)

[JavaScript](https://www.codecademy.com/learn/introduction-to-javascript)

[React](https://reactjs.org/tutorial/tutorial.html)

[Next.js](https://nextjs.org/learn/basics/create-nextjs-app)





