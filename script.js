document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Table of Contents (TOC) Generation & Scrollspy ---
    const tocList = document.getElementById('toc-list');
    const article = document.querySelector('.blog-post'); // Content area
    const headings = article.querySelectorAll('h2[id]'); // Get only H2s with IDs
    const tocContainer = document.getElementById('toc-container');

    // Only proceed if TOC elements and headings exist
    if (tocList && headings.length > 0 && tocContainer) {
        // Generate TOC items
        headings.forEach(heading => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.textContent = heading.textContent.substring(heading.textContent.indexOf('.') + 1).trim(); // Get text after "I. " etc.
            link.href = `#${heading.id}`;

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        // Scrollspy implementation using Intersection Observer
        const tocLinks = tocList.querySelectorAll('a');
        const observerOptions = {
            rootMargin: '-100px 0px -50% 0px', // Adjust viewport margins (top, right, bottom, left)
            threshold: 0 // Trigger as soon as element enters/leaves adjusted viewport
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const correspondingLink = tocList.querySelector(`li a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    // Remove active class from all links first
                    tocLinks.forEach(link => link.parentElement.classList.remove('active'));
                    // Add active class to the current intersecting heading's link
                    if (correspondingLink) {
                        correspondingLink.parentElement.classList.add('active');
                    }
                }
                // Optional: Remove active class when element leaves viewport
                // else {
                //     if (correspondingLink) {
                //         correspondingLink.parentElement.classList.remove('active');
                //     }
                // }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        headings.forEach(heading => observer.observe(heading));

    } else if (tocContainer) {
         // Hide TOC if no headings found or TOC list missing
         tocContainer.style.display = 'none';
    }


    // --- 2. "Copy Code" Button Functionality ---
    const allPres = document.querySelectorAll('.blog-post pre');
    allPres.forEach(pre => {
        const codeBlock = pre.querySelector('code');
        if (!codeBlock) return; // Skip if no code block inside pre

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-code-button';

        copyButton.addEventListener('click', () => {
            const codeToCopy = codeBlock.innerText;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000); // Reset after 2 seconds
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                copyButton.textContent = 'Error';
                 setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });

        pre.appendChild(copyButton);
    });


    // --- 3. "Back to Top" Button Functionality ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        const scrollThreshold = 300; // Pixels scrolled before button appears

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scrolling effect
            });
        });
    }

}); // End DOMContentLoaded