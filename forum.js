// forum.js
document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById('postsContainer');
    const newPostForm = document.getElementById('newPostForm');
  
    // Array to hold posts
    let posts = [];
  
    // Function to render posts
    function renderPosts() {
      postsContainer.innerHTML = ''; // Clear the container first
      posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        postElement.innerHTML = `
          <h3>${post.username}</h3>
          <p>${post.content}</p>
          <button onclick="toggleReplyForm(${index})">Reply</button>
          <div id="replyForm-${index}" class="replySection hidden">
            <input type="text" id="replyContent-${index}" placeholder="Write a reply" />
            <button onclick="addReply(${index})">Submit Reply</button>
            <div id="replyList-${index}">
              <!-- Replies will go here -->
            </div>
          </div>
        `;
        postsContainer.appendChild(postElement);
  
        // Render existing replies
        const replyList = document.getElementById(`replyList-${index}`);
        post.replies.forEach(reply => {
          const replyElement = document.createElement('div');
          replyElement.classList.add('reply');
          replyElement.innerHTML = `<p>${reply}</p>`;
          replyList.appendChild(replyElement);
        });
      });
    }
  
    // Add new post
    newPostForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const content = document.getElementById('postContent').value;
  
      // Add the new post to the posts array
      posts.push({ username, content, replies: [] });
  
      // Clear the form
      newPostForm.reset();
  
      // Re-render posts
      renderPosts();
    });
  
    // Toggle reply form
    window.toggleReplyForm = function(postIndex) {
      const replyForm = document.getElementById(`replyForm-${postIndex}`);
      replyForm.classList.toggle('hidden');
    }
  
    // Add a reply
    window.addReply = function(postIndex) {
      const replyContent = document.getElementById(`replyContent-${postIndex}`).value;
  
      if (replyContent) {
        // Add reply to the post's replies array
        posts[postIndex].replies.push(replyContent);
  
        // Re-render the posts with replies
        renderPosts();
      }
    }
  });
  