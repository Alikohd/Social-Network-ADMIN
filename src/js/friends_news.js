$(document).ready(async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const user = await $.get(`https://localhost:${port}/users/${id}`);

        if (!user) {
            console.error('Failed to fetch user data');
            return;
        }

        $('h1').text(`Новости друзей пользователя ${user.name}`);

        const friends = $('<div>').addClass('container');

        await Promise.all(user.friends.map(async function (friendId) {
            const friendContainer = $('<div>').addClass('friend-news-container');

            const friend = await $.get(`https://localhost:${port}/users/${friendId}`);
            const friendHeading = $('<a>')
                .text(friend.name)
                .attr('href', `user_page.html?userName=${friend.id}`);

            const newsList = $('<ul>');

            const news = await $.get(`https://localhost:${port}/news/${friendId}`);
            news.forEach(userNew => {
                const newsItem = $('<li>');
                const title = $('<div>').text(`${userNew.title}`).addClass('news-title');
                const text = $('<div>').text(userNew.text).addClass('news-text');

                newsItem.append(title);
                newsItem.append(text);
                newsList.append(newsItem);
            });

            friendContainer.append(friendHeading, newsList);
            friends.append(friendContainer);
        }));

        $('body').append(friends);
    } catch (error) {
        console.error('Error:', error);
    }
});
