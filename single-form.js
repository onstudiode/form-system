document['addEventListener']('DOMContentLoaded', function () {
    const _0x4fd8a5 = document['querySelectorAll']('.single-submit');
    _0x4fd8a5['forEach'](function (_0x1f46e4) {
        _0x1f46e4['addEventListener']('click', async function (_0x37dc42) {
            const _0x2f7a71 = _0x1f46e4['closest']('form');
            if (_0x2f7a71) {
                _0x37dc42['preventDefault']();
                console['log']('Form\x20gefunden:', _0x2f7a71);
                if (_0x2f7a71['id']['startsWith']('wf-form-sf-')) {
                    const _0x1afd13 = _0x2f7a71['getAttribute']('data-webhook');
                    console['log']('Webhook:', _0x1afd13);
                    if (_0x2f7a71['checkValidity']()) {
                        await new Promise(_0x5ed5d6 => setTimeout(_0x5ed5d6, 0x3e8));
                        const _0xf432fe = _0x1f46e4['tagName'] === 'INPUT' ? _0x1f46e4['value'] : _0x1f46e4['innerText'];
                        _0x208b9f(_0x1afd13, _0x2f7a71, _0x1f46e4, _0xf432fe);
                    } else {
                        console['log']('Formular\x20ist\x20nicht\x20gültig.\x20Senden\x20abgebrochen.');
                        _0x2f7a71['reportValidity']();
                    }
                } else {
                    console['log']('Formular\x20hat\x20falsche\x20ID:', _0x2f7a71['id']);
                }
            } else {
                console['log']('Formular\x20nicht\x20gefunden');
            }
        });
    });
    function _0x208b9f(_0x38f864, _0x16e7ae, _0x57c697, _0x590161) {
        const _0x17b467 = {};
        const _0x3596a0 = _0x16e7ae['querySelectorAll']('input[type=\x22radio\x22]');
        _0x3596a0['forEach'](_0x3ee940 => {
            const _0x565ac6 = _0x3ee940['getAttribute']('name');
            const _0x32b50a = _0x3ee940['getAttribute']('data-name');
            const _0x1f41d5 = _0x3ee940['checked'];
            if (_0x565ac6 && _0x1f41d5) {
                _0x17b467[_0x565ac6] = _0x32b50a;
            }
        });
        const _0x3d9a13 = _0x16e7ae['querySelectorAll']('input[type=\x22checkbox\x22]');
        _0x3d9a13['forEach'](_0x4815e1 => {
            _0x17b467[_0x4815e1['getAttribute']('data-name')] = _0x4815e1['checked'] ? 'Ja' : 'Nein';
        });
        const _0x58fc37 = _0x16e7ae['querySelectorAll']('input[type=\x22text\x22]');
        _0x58fc37['forEach'](_0x3f1dfd => {
            _0x17b467[_0x3f1dfd['getAttribute']('data-name')] = _0x3f1dfd['value'];
        });
        const _0x15e781 = _0x16e7ae['querySelectorAll']('textarea');
        _0x15e781['forEach'](_0x52471c => {
            _0x17b467[_0x52471c['getAttribute']('data-name')] = _0x52471c['value'];
        });
        const _0x52b9a7 = _0x16e7ae['querySelectorAll']('input[type=\x22number\x22]');
        _0x52b9a7['forEach'](_0x4ac105 => {
            _0x17b467[_0x4ac105['getAttribute']('data-name')] = _0x4ac105['value'];
        });
        const _0x3d51ee = _0x16e7ae['querySelectorAll']('input[type=\x22tel\x22]');
        _0x3d51ee['forEach'](_0x53bf4e => {
            _0x17b467[_0x53bf4e['getAttribute']('data-name')] = _0x53bf4e['value'];
        });
        const _0x407cfe = _0x16e7ae['querySelectorAll']('input[type=\x22email\x22]');
        _0x407cfe['forEach'](_0x42ae15 => {
            _0x17b467[_0x42ae15['getAttribute']('data-name')] = _0x42ae15['value'];
        });
        _0x17b467['_0x5077cf'] = _0x16e7ae['getAttribute']('id');
        console['log']('Formulardaten:', _0x17b467);
        const _0x56e189 = _0x16e7ae['parentElement'];
        const _0xf01338 = _0x56e189['querySelector']('.w-form-done');
        const _0x550c4f = _0x56e189['querySelector']('.w-form-fail');
        fetch(_0x38f864, {
            'method': 'POST',
            'headers': { '_0x4a4460': 'application/json;\x20charset=utf-8' },
            'body': JSON['stringify'](_0x17b467)
        })['then'](_0x2ab76b => {
            if (_0x2ab76b['ok']) {
                if (_0x57c697['tagName'] === 'INPUT') {
                    _0x57c697['value'] = _0x590161;
                } else {
                    _0x57c697['innerText'] = _0x590161;
                }
                _0x57c697['disabled'] = ![];
                _0x16e7ae['style']['display'] = 'none';
                _0xf01338['style']['display'] = 'block';
                _0x550c4f['style']['display'] = 'none';
                console['log']('Erfolgreich\x20abgesendet');
            } else {
                console['log']('Fehler\x20beim\x20Senden:', _0x2ab76b);
                _0x16e7ae['style']['display'] = 'block';
                _0xf01338['style']['display'] = 'none';
                _0x550c4f['style']['display'] = 'block';
            }
        })['catch'](_0x47d6ad => {
            console['error']('Fehler:', _0x47d6ad);
            _0x16e7ae['style']['display'] = 'block';
            _0xf01338['style']['display'] = 'none';
            _0x550c4f['style']['display'] = 'block';
        });
    }
});
