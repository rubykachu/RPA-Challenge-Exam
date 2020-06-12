$(function () {
  var yourname;
  var round = 0;
  var maxRound = 7;
  var results = [];
  var form = {
    fullname: 'Fullname',
    gender: 'Gender',
    birthday: 'Birthday',
    city: 'City',
    state: 'State',
    zip: 'Zip'
  }

  // Todo: Submit via enter
  $(document).on("keypress", "input", function (e) {
    if (e.which == 13) {
      $(this).closest('.row').children('button').click();
    }
  });

  // Todo: click Start
  $('.js--start').on('click', function () {
    if (round == 0) {
      _showPanelYourname();
      $('.js--page-content').removeClass('avoid-click');
      $(this).text('Ready');
      _resetData();
    } else {
      return false
    }
  });

  // Todo: click Let's go
  $('.js--letgo').on('click', function () {
    yourname = $('input[name="yourname"]').val()
    if (yourname.length == 0) {
      alert('Please enter yourname')
    } else {
      $('.js--panel-yourname').fadeOut('fast', function () {
        _showForm();
        _changeRound();
        $('.js--panel-information').fadeIn('fast');
      })
    }
  });

  // Todo: click Submit
  $('.js--submit').on('click', function () {
    _changeRound();
    _pushValFormToResults();

    if (round > maxRound) {
      round = 0;
      $('.js--start').text('Reset');
      _showPanelResults();
    } else {
      _showForm();
    }
  })

  //====== PRIVATE FUNCTIONS ======

  // Operation
  function _pushValFormToResults() {
    results.push(_fetchValForm());
  }

  function _fetchValForm() {
    return {
      fullname: $('input[name="fullname"]').val(),
      gender: $('input[name="gender"]').val(),
      birthday: $('input[name="birthday"]').val(),
      city: $('input[name="city"]').val(),
      state: $('input[name="state"]').val(),
      zip: $('input[name="zip"]').val()
    }
  }

  function _resetData() {
    $('input[name="yourname"]').val('');
    yourname = ''
    results = []
    round = 0
  }

  // Display
  function _changeRound() {
    round += 1;
    return $('.js--start').text(`Round ${round}`);
  }

  function _showPanelResults() {
    _hiddenAllForm();
    $('.js--panel-result').show();
    _showTableResults();
  }

  function _showPanelYourname() {
    _hiddenAllForm();
    $('.js--panel-yourname').show();
  }

  function _hiddenAllForm() {
    $('[class*="js--panel"]').hide();
  }

  // Forms
  function _showForm() {
    return $('.js--inner-form').html(_buildForm());
  }

  function _buildForm() {
    let html = '';
    let keys = Object.keys(form);
    let col = _randomCol();
    keys.sort(function (a, b) { return Math.random() - 0.5; });
    keys.forEach(function (k) {
      html += _formControl({ label: form[k], name: k, col: col })
    });
    return html;
  }

  function _formControl({ label, name, col }) {
    return `<div class="col ${col}">
      <div class="form-control">
        <label>${label}</label>
        <input type="text" name="${name}" id="${_makeId()}">
      </div>
    </div>`
  }

  function _randomCol() {
    let number = Math.floor(Math.random() * 8) + 2;
    return `s${number}`
  }

  function _makeId(length) {
    return Math.random().toString(36).substring(7);
  }

  // Table Results
  function _showTableResults() {
    let rows = ''
    results.forEach(function (v) {
      rows += _trTable({
        fullname: v['fullname'],
        gender: v['gender'],
        birthday: v['birthday'],
        city: v['city'],
        state: v['state'],
        zip: v['zip']
      });
    });
    $('.js--table-results caption strong').html(yourname);
    $('.js--table-results tbody').html(rows);
  }

  function _trTable({ fullname, gender, birthday, city, state, zip }) {
    return `
    <tr>
      <th>${fullname}</th>
      <th>${gender}</th>
      <th>${birthday}</th>
      <th>${city}</th>
      <th>${state}</th>
      <th>${zip}</th>
    </tr>
    `;
  }
});
