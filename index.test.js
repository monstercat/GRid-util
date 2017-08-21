const assert = require('assert');
const util   = require('./index');

const sample = 'A12425GABC1234002';

describe('GRid Util', ()=> {
  describe('checkChar', ()=> {
    it('should work', ()=> {
      assert(util.checkChar(sample) == 'M', 'Unexpected check character.');
    });
  });

  describe('breakIdentifier', ()=> {
    it('should work', ()=> {
      var obj = util.breakIdentifier(sample + 'M');
      assert(obj.identifierScheme == 'A1', 'Identifier scheme did not match.');
      assert(obj.issuerCode == '2425G', 'Issuer code did not match.');
      assert(obj.releaseNumber == 'ABC1234002', 'Release code did not match.');
      assert(obj.checkCharacter == 'M', 'Check character did not match.');
    });
  });
});
