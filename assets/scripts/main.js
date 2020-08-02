<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

<script type="text/javascript">
  window.mdc.autoInit();

  const list = new mdc.list.MDCList(document.querySelector('.mdc-list'));
  list.singleSelection = true;

  const select = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));
  select.listen('MDCSelect:change', () => {
    window.location = select.value;
  });

  var buttons = document.getElementsByClassName('mdc-button');
  for (var i=0 ; i < buttons.length ; i++){
    (function(index){
      buttons[index].onclick = function(){
        let drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('#NAV' + this.value));
        drawer.open = !drawer.open; // mdc-drawer--dismissible
        // drawer.open = true // mdc-drawer--modal
      };
    })(i)
  }

</script>
