(function(){
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');
  let current = '';
  let lastResult = null;

  function updateDisplay(v){ display.value = v; }

  keys.addEventListener('click', e => {
    const target = e.target;
    if(!target.matches('button')) return;
    const val = target.dataset.value;
    const action = target.dataset.action;

    if(val){
      // append number or dot
      if(val === '.' && current.includes('.')) return;
      current += val;
      updateDisplay(current);
      return;
    }

    if(action){
      if(action === 'clear'){
        current = '';
        lastResult = null;
        updateDisplay('');
        return;
      }

      if(action === 'equals'){
        try{
          // sanitize and evaluate expression
          // allow digits, operators and dots only
          const safe = current.replace(/[^0-9+\-*/().]/g,'');
          const result = Function('return '+ safe)();
          updateDisplay(result);
          lastResult = String(result);
          current = String(result);
        }catch(err){
          updateDisplay('Error');
          current = '';
        }
        return;
      }

      // operator buttons map to symbols
      const map = { add: '+', subtract: '-', multiply: '*', divide: '/' };
      const op = map[action];
      if(op){
        // prevent duplicate operators
        if(current === '' && lastResult) current = lastResult;
        if(current.endsWith('+')||current.endsWith('-')||current.endsWith('*')||current.endsWith('/')){
          current = current.slice(0,-1) + op;
        }else{
          current += op;
        }
        updateDisplay(current);
      }
    }
  });
})();
