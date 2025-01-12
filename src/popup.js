document.addEventListener('DOMContentLoaded', function() {
    // Get all relevant elements
    const signupButton = document.getElementById('signupButton');
    const bookmarkButton = document.getElementById('bookmarkButton');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    if (signupButton) {
        signupButton.addEventListener('click', () => {
            try {
                // Open Claude in a new window
                chrome.windows.create({
                    url: 'https://claude.ai',
                    type: 'normal',
                    focused: true,
                    width: 1200,
                    height: 800
                });

                // Enable bookmark button
                if (bookmarkButton) {
                    bookmarkButton.disabled = false;
                }
                
                step1.classList.add('completed');
                step2.classList.add('active');

            } catch (error) {
                console.error('Error opening Claude:', error);
                alert('שגיאה בפתיחת Claude: ' + error.message);
            }
        });
    }

    if (bookmarkButton) {
        bookmarkButton.addEventListener('click', async () => {
            try {
                const bookmarkTree = await chrome.bookmarks.getTree();
                const bookmarkBarId = bookmarkTree[0].children[0].id;
                
                await chrome.bookmarks.create({
                    parentId: bookmarkBarId,
                    title: 'Claude AI',
                    url: 'https://claude.ai'
                });

                bookmarkButton.style.backgroundColor = '#28a745';
                bookmarkButton.textContent = '✓ נוסף למועדפים';
                bookmarkButton.disabled = true;

                step2.classList.add('completed');

            } catch (error) {
                console.error('Error creating bookmark:', error);
                alert('שגיאה בהוספת סימניה: ' + error.message);
            }
        });
    }
});
