var port, fullname, info, loggedIn

function likeDelta(likes) {
  if (likes == true) {
    return 1
  } else if (likes == false) {
    return -1
  } else {
    return 0
  }
}

function vote(likes) {
  info.score += likeDelta(likes) - likeDelta(info.likes)
  info.likes = likes
  update()
  port.postMessage({action:'vote', likes:info.likes})
}

function toggleSaved() {
  info.saved = !info.saved
  update()
  if (info.saved) {
    port.postMessage({action:'save'})
  } else {
    port.postMessage({action:'unsave'})
  }
}

function update() {
  initButtons()

  document.getElementById('title').textContent = info.title
  var bar = document.getElementById('bar')

  if (loggedIn) {
    addClass(bar, 'logged-in')
    removeClass(bar, 'logged-out')
  } else {
    removeClass(bar, 'logged-in')
    addClass(bar, 'logged-out')
  }

  fitHeight()

  if (info.permalink) {
    var title   = document.getElementById('title');
    title.setAttribute('href', 'https://www.reddit.com'+info.permalink)
  }

  if (info.likes == true) {
    removeClass(bar, 'disliked')
    addClass(bar, 'liked')
  } else if (info.likes == false) {
    removeClass(bar, 'liked')
    addClass(bar, 'disliked')
  } else {
    removeClass(bar, 'liked')
    removeClass(bar, 'disliked')
  }

  if (info.saved == true) {
    addClass(bar, 'saved')
  } else {
    removeClass(bar, 'saved')
  }

  if (localStorage['showTooltips'] != 'false') {
    document.getElementById('save').setAttribute('title', info.saved ? 'Unsave' : 'Save')
  }

  document.getElementById('score').textContent = info.score
  if (info.subreddit) {
    var subPath = '/r/'+info.subreddit
    var subreddit = document.getElementById('subreddit')
    subreddit.textContent = subPath
    subreddit.setAttribute('href', 'https://www.reddit.com'+subPath)
  } else {
    removeClass(bar, 'subreddit')
  }
  document.getElementById('comments').textContent = info.num_comments
}

function initButtons() {
  if (buttonsReady || info._fake) { return }
  document.getElementById('comments').setAttribute('href', 'https://www.reddit.com'+info.permalink)

  document.getElementById('upvote').addEventListener('click', function() {
    vote(info.likes == true ? null : true)
  })

  document.getElementById('downvote').addEventListener('click', function() {
    vote(info.likes == false ? null : false)
  })

  document.getElementById('save').addEventListener('click', function() {
    toggleSaved()
  })

  document.getElementById('login').addEventListener('click', function () {
    window.open('https://www.reddit.com/login/')
  })

  document.getElementById('close').addEventListener('click', function() {
    port.postMessage({action:'close'})
    msgJSON({action:'close'})
  })

  buttonsReady = true
}

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage['showTooltips'] == 'false') {
    document.getElementById('title').removeAttrribute('title')
  }
  window.addEventListener('resize', fitHeight)
})

buttonsReady = false
fullname = window.location.hash.substr(1)

port = browser.runtime.connect({name:'bar:'+fullname})
port.onMessage.addListener(function(msg) {
  switch (msg.action) {
    case 'update':
      console.log('Received updated info', msg)
      info = msg.info
      loggedIn = msg.loggedIn
      update()
      break
  }
})
port.postMessage({action:'update', useStored:'true'})
