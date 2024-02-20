function create_user_elem(user) {
    const userCard = $('<div>').addClass('card mb-3');
    const cardHeader = $('<div>').addClass('card-header bg-light').text(user.name);
    const cardBody = $('<div>').addClass('card-body row');
    const userPhotoCol = $('<div>').addClass('col-md-3');

    const img = $('<img>').attr({
        src: user.photoUrl,
        alt: 'Фото пользователя',
    }).addClass('img-fluid rounded-circle');

    userPhotoCol.append(img);

    const userInfoCol = $('<div>').addClass('col-md-9');

    const paragraphs = [
        `Email: ${user.email}`,
        `Дата рождения: ${user.birthdate}`,
        `Роль: ${rolesDict[user.role]}`,
        `Статус: ${statusesDict[user.status]}`,
    ];

    paragraphs.forEach(text => {
        const p = $('<p>').text(text);
        userInfoCol.append(p);
    });

    const buttonsDiv = $('<div>').addClass('mt-3');
    const editLink = $('<a>').addClass('btn btn-primary mr-2').attr('href', `user_edit_page.html?id=${user.id}`).text('Изменить');
    const friendsLink = $('<a>').addClass('btn btn-secondary mr-2').attr('href', `friend_list_page.html?id=${user.id}`).text('Друзья');
    const friendsNewsLink = $('<a>').addClass('btn btn-info').attr('href', `friend_news_page.html?id=${user.id}`).text('Новости друзей');

    buttonsDiv.append(editLink);
    buttonsDiv.append(friendsLink);
    buttonsDiv.append(friendsNewsLink);

    cardBody.append(userPhotoCol);
    cardBody.append(userInfoCol);
    cardBody.append(buttonsDiv);

    userCard.append(cardHeader);
    userCard.append(cardBody);

    return userCard;
}
