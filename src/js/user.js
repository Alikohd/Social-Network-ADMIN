async function getUserNameById(userId) {
    try {
        const user = await $.get(`https://localhost:${port}/users/${userId}`);

        if (user) {
            return user.name;
        } else {
            console.error(`User not found with ID ${userId}`);
            return "Unknown User";
        }
    } catch (error) {
        console.error(`Error fetching user data for ID ${userId}:`, error);
        return "Unknown User";
    }
}


$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $.get(`https://localhost:${port}/users/${id}`, async function (user) {
        if (!user) {
            console.error('Error when retrieving user information..');
            return
        }

        const userBlock = $('.user_block_user');

        let userCard = create_user_elem(user)

        userBlock.append(userCard);


        const friendsList = await Promise.all(user.friends.map(async friend => {
            const userName = await getUserNameById(friend);
            return `<li><a href="user_page.html?id=${friend}">${friend} ${userName}</a></li>`;
        }));
        $('.user_block_friends').html(`<ul>${friendsList.join('')}</ul>`);


        const friendsNewsContainer = $('.user_block_news');

        for (const friendId of user.friends) {
            const friendName = await getUserNameById(friendId);

            const friendInfo = `<div><a href="user_page.html?id=${friendId}">${friendId} ${friendName}</a></div>`;
            friendsNewsContainer.append(friendInfo);

            const news = await $.get(`https://localhost:${port}/news/${friendId}`);
            if (news && news.length > 0) {
                const newsListHTML = news.map(userNew => `<li>${userNew.title}</li>`).join('');
                const friendsNewsList = `<div><ul>${newsListHTML}</ul></div>`;
                friendsNewsContainer.append(friendsNewsList);
            }
        }

    });
});
