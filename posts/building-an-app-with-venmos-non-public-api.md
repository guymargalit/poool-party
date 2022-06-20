---
title: Building an app with Venmo's Non-Public API
description: In 2016, Venmo decided to stop providing developers access to their API. There was however one catch, the API is still available to existing developers. So I figured there must be a way for me to use it if it wasn't completely gone.
date: '2022-06-20'
---

In 2016, Venmo decided to [stop providing developers access to their API](https://techcrunch.com/2016/02/26/how-not-to-run-a-platform/). There was however one catch, the API is still available to existing developers. So I figured there must be a way for me to use it if it wasn't completely gone.

The main features I needed with Venmo were as follows:
- Connect Venmo Account with Sign-in
- Access Venmo username and profile
- Search Venmo's existing users
- Send a Venmo request to a user
- Get the status of the Venmo request (pending, cancelled, successful)

So here began my journey...

## The Venmo API

I started by googling "venmo api" and after some clicking around landed here: [https://venmo.com/docs/overview](https://venmo.com/docs/overview). The only really useful information here was the basic User and Payment endpoints. Authentication was only usefull if I had a `Client ID` but I didn't register a developer app with Venmo before 2016 (more on this later) so I would have to figure out another way to get an access token.

This then lead me to the `Unofficial Venmo API`.

## The Unofficial Venmo API

Special thanks to `mmohades` for making this [awesome repo](https://github.com/mmohades/VenmoApiDocumentation). With it, I was able to setup a "Connect your Venmo" without using a `Client ID` and accounting for the OTP (One Time Password) setup when it texts you for verification.

While this wasn't the most secure or official way, this at the very least got me the access token I needed to start setting up requests. Security-wise, I went ahead and encrypted the access token received and obviously did not store the user's password (if anyone has anymore suggestions for a novice developer such as myself, please let me know 😃)

I then began to start testing out the Payment API and found this:

```
amount (required)

The amount you want to pay. To create a charge, use a negative amount.
```

In one case, the request, both parties agree on the transfer of money but in the other, it would just send money instantly! That doesn't seem like the best design to me and maybe is why some of this API was retired but either way, it worked!

Just had to be extra careful to make sure the number was never positive.

# Charles: Web Debugging Proxy Application

So far the only API endpoint I was having trouble with was searching Venmo's users. It was not documented anywhere and the closest I could get was getting a list of your Venmo friends.

This wasn't very applicable though as I don't know anyone who uses the Venmo friend capabilities and I wanted a user to be able to find anyone on Venmo.

So through the use of [Charles](https://www.charlesproxy.com/) I was able to determine all of the network requests coming from the Venmo app on my iPhone and found the last missing piece:

```
https://api.venmo.com/v1/users?query=ab&type=username
```

It also gave me this one which could prove helpful:

```
https://api.venmo.com/v1/suggested
```

This did of course require a Venmo account to be connected in order to request so I also went ahead and made a search for non authenticated users that was a little scrappy. It would basically just verify if the Venmo username existed by requesting the public username page at `venmo.com/{username}`:

```js
const u = JSON.parse(`${findTextObject(result, 'venmo.load.MDJ = ')}}`);
return res.json({
  data: [
    {
      id: u?.page_user_external_id,
      username: u?.page_user?.username,
      first_name: u?.page_user?.first_name,
      display_name: u?.page_user?.full_name,
      profile_picture_url: u?.page_user?.profile_picture?.replaceAll(
        '&amp;',
        '&'
      ),
    },
  ],
});
```

## Further Investigating

While the app was now functioning and had all the features I had set out for, one of them still bothered me. I still wanted proper OAuth through Venmo. Other apps still have these capabilities. Why can't mine?

Of course there was still the issue, I didn't have a developer app registered with Venmo. But maybe it was still possible?

After a lot of searching around, I was able to find where developer apps were supposed to be ([https://venmo.com/account/settings/developer](https://venmo.com/account/settings/developer)).

There was of course no option to create the application, but further investigating lead me to the discovery that I could access where the app would be at this url by inputting any number: [https://venmo.com/account/settings/developer/apps/1](https://venmo.com/account/settings/developer/apps/1)

It showed me the fields used in a developer app and I had the thought, "what if I could still send a POST request to create the application?". Of course I thought there was no way it would work, but alas with some finicking around I successfully created a developer app, after 2016:

![Created Venmo Developer app](/images/post-3.png)

This would now give me the ability to use Webhooks and most importantly, OAuth with Venmo!

## Closing Remarks

Overall, it was a fun journey and I learned a lot about sleuthing existing APIs. Venmo if you're reading this, please let me keep my app! Or give me the ability to setup recurring charges so I don't keep forgetting to Venmo request my sisters for our shared Hulu account.

For those intersted in the final product, you can find that here at [poool.party](https://poool.party/). 