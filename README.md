# Reddit Companion For Firefox

This repository contains the Reddit Companion extension made to work with FF's
WebExtensions API.

Requires FF57+.

The original repository can be found [here](https://github.com/creesch/reddit-companion) (This is the more recently mainteined fork).


## features

### info bar

Browsing to pages from reddit or clicking on the alien icon in the location bar
opens an information bar at the top of the page. The bar shows the current score
and title of the page submission on reddit and makes it easy to vote, save the 
post, and view comments.

### submit bar

Clicking on the alien icon in the location bar opens a submit bar if the page 
is not already submitted to reddit. The submit bar allows users to craft a title
for the reddit submission without leaving the page. Clicking submit opens the 
reddit submit page with the title filled in.

### message notifications

Incoming messages are checked for every 5 minutes. When a new message arrives, 
a desktop notification is displayed containing a preview of the message. 
Clicking on the message opens the reddit inbox.

### Future: Mod related buttons.

The goal is to add the "spam/remove/approve" buttons in the toolbar as well. Possibly with toolbox integration to facilitate removal reasons. 
