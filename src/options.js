document.addEventListener('DOMContentLoaded', function() {
  var messages = [
    'greetings, human.',
    'someone is wrong on the internet!',
    'regarding your karma portfolio',
    '[meme regarding narwhals]',
    'help, trapped in an options page'
  ]
  document.getElementsByClass('message')[0].text(randomChoice(messages))

  var checkboxes = document.getElementsByTagName('input')
  for (var el of checkboxes) {
      if (localStorage[el.id] == 'true') {
          el.checked = true
          addClass(document.getElementById('contents'), el.id)
      }

      el.addEventListener('click', function() {
          localStorage[ el.id ] = el.checked
          document.getElementsById('contents').classList.toggle(this.id, value)
      })
  }
})
