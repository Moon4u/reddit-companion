function updateTarget() {
  var target =
    'https://www.reddit.com/submit/?resubmit=true'+
    '&url='+window.location.hash.substr(1)+
    '&title='+encodeURIComponent(document.getElementById('title-input').value)
  document.getElementById('submit').setAttribute('href', target)
  return target
}

function randomMsg() {
  document.getElementById('title-input').setAttribute('placeholder', function() {
    var adjs = ['a fitting', 'an engaging', 'a concise'],
        ends = ['Be nice!', 'Have fun!', 'Good luck!']
    return 'Enter '+randomChoice(adjs)+' title to share this page with reddit. '+randomChoice(ends)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('resize', fitHeight)

  document.getElementById('title-input').addEventListener('keypress', function(e) {
    updateTarget()
    if (e.which == 13) {
      window.top.location = document.getElementById('submit').attr('href')
    }
  })

  document.getElementById('close').addEventListener('click',function() {
    msgJSON({action:'close'})
  })

  randomMsg()
  fitHeight()
})
