(function(_0xabc, _0xdef) {
    const _0x123 = function(_0x234) {
        while (--_0x234) {
            _0xabc['push'](_0xabc['shift']());
        }
    };
    _0x123(++_0xdef);
}(['0x0', '0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'], 0x8));

function _0x567() {
    const _0x789 = [
        '0x0', '0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'
    ];
    return Math['floor'](Math['random']() * Math['pow'](0x10, _0x789[0x0]));
}

const _0xabc = function() {
    const _0x1234 = document['getElementById']('generateEmail');
    const _0x5678 = document['getElementById']('showMessages');
    const _0x9abc = document['getElementById']('emailAddress');
    const _0xdef0 = document['getElementById']('messageList');
    const _0x1a2b = document['getElementById']('dialog');
    const _0x3c4d = document['getElementById']('dialogContent');
    const _0x5e6f = document['getElementById']('closeDialog');
    
    let _0x7f8g = '';
    const _0x9a0b = 'https://www.1secmail.com/api/v1/';
    
    function _0x1234() {
        const _0x3456 = getRandomName()['toLowerCase']()['replace'](/\s+/g, '');
        const _0x4567 = _0x567();
        const _0x5678 = ['vjuum.com', 'txcct.com', 'rteet.com'];
        const _0x6789 = _0x5678[Math['floor'](Math['random']() * _0x5678['length'])];
        
        const _0x7890 = `${_0x3456}${_0x4567}@${_0x6789}`;
        _0x7f8g = _0x7890;
        
        _0x9abc['textContent'] = `Generated Email: ${_0x7890}`;
        _0xdef0['innerHTML'] = '';
        
        fetchMessages();
    }
    
    async function fetchMessages() {
        if (!_0x7f8g) {
            _0xdef0['innerHTML'] = '<p>Please generate an email first.</p>';
            return;
        }
        
        try {
            const _0x890a = _0x7f8g['split']('@');
            const _0x901b = await fetch(`${_0x9a0b}?action=getMessages&login=${_0x890a[0]}&domain=${_0x890a[1]}`);
            const _0x0123 = await _0x901b['json']();
            
            if (_0x0123['length'] > 0) {
                displayMessageList(_0x0123);
            } else {
                _0xdef0['innerHTML'] = '<p>No messages found.</p>';
            }
        } catch (_0x456a) {
            _0xdef0['innerHTML'] = '<p>Error fetching messages.</p>';
            console['error']('Error fetching messages:', _0x456a);
        }
    }
    
    function displayMessageList(_0x5678) {
        _0xdef0['innerHTML'] = '<h2>Message List</h2>';
        _0x5678['forEach'](_0x6789 => {
            const _0x789a = document['createElement']('div');
            _0x789a['className'] = 'message-item';
            _0x789a['textContent'] = `From: ${_0x6789['from']} - Subject: ${_0x6789['subject']}`;
            _0x789a['dataset']['messageId'] = _0x6789['id'];
            _0x789a['addEventListener']('click', () => showMessageDialog(_0x6789['id']));
            _0xdef0['appendChild'](_0x789a);
        });
    }
    
    async function showMessageDialog(_0x6789) {
        if (!_0x7f8g) {
            _0x3c4d['innerHTML'] = '<p>Please generate an email first.</p>';
            return;
        }
        
        try {
            const _0x7890 = _0x7f8g['split']('@');
            const _0x890a = await fetch(`${_0x9a0b}?action=readMessage&login=${_0x7890[0]}&domain=${_0x7890[1]}&id=${_0x6789}`);
            const _0x901b = await _0x890a['json']();
            _0x3c4d['innerHTML'] = `
                <h2>Message Details</h2>
                <p><strong>From:</strong> ${_0x901b['from']}</p>
                <p class="subject"><strong>Subject:</strong> ${_0x901b['subject']}</p>
                <p><strong>Message:</strong></p>
                <p>${_0x901b['textBody']}</p>
            `;
            _0x1a2b['classList']['add']('show');
        } catch (_0x0123) {
            _0x3c4d['innerHTML'] = '<p>Error fetching message.</p>';
            console['error']('Error fetching message:', _0x0123);
        }
    }
    
    function closeDialog() {
        _0x1a2b['classList']['remove']('show');
    }
    
    _0x123['addEventListener']('click', _0x1234);
    _0x5678['addEventListener']('click', fetchMessages);
    _0x5e6f['addEventListener']('click', closeDialog);
})();
