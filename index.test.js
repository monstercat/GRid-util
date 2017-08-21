const assert = require('assert');
const util   = require('./index');

describe('GRid Util', ()=> {
  describe('checkChar', ()=> {
      it('should work', ()=> {
        assert(util.checkChar('A12425GABC1234002') == 'M', 'Unexpected check character.');
      });
  });
});
