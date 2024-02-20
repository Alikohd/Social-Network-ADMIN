function getRoleDisplayName(role) {
  if (rolesDict.hasOwnProperty(role)) {
    return rolesDict[role];
  }
  if (statusesDict.hasOwnProperty(role)) {
    return statusesDict[role];
  }
  return role;
}


$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    console.error('User with this ID not found');
    return;
  }

  $.get(`https://localhost:${port}/users/${id}`, function (editUser) {
    const form = $('<form>').addClass('container mt-4');

    const formFields = [
      { label: 'Имя пользователя', type: 'text', name: 'name', value: editUser.name },
      { label: 'Электронная почта', type: 'email', name: 'email', value: editUser.email },
      { label: 'Дата рождения', type: 'date', name: 'birthdate', value: editUser.birthdate.split('.').reverse().join('-') },
      {
        label: 'Роль пользователя',
        type: 'select',
        name: 'role',
        options: Object.keys(rolesDict),
        selected: editUser.role
      },
      {
        label: 'Статус пользователя',
        type: 'select',
        name: 'status',
        options: Object.keys(statusesDict),
        selected: editUser.status
      }
      ];

    formFields.forEach(field => {
      const formGroup = $('<div>').addClass('form-group');
      const label = $('<label>').text(field.label).attr('for', field.name);
      formGroup.append(label);

      if (field.type === 'select') {
        const select = $('<select>').addClass('form-control').attr('name', field.name);
        field.options.forEach(optionValue => {
          const option = $('<option>').val(optionValue).text(getRoleDisplayName(optionValue));
          if (optionValue === field.selected) {
            option.attr('selected', 'selected');
          }
          select.append(option);
        });
        formGroup.append(select);
      } else {
        const input = $('<input>').addClass('form-control').attr({
          type: field.type,
          name: field.name,
          id: field.name,
          value: field.value
        });
        formGroup.append(input);
      }

      form.append(formGroup);
    });

    const submitButton = $('<button>').addClass('btn btn-success mt-3').attr('type', 'submit').text('Применить изменения');
    form.append(submitButton);

    form.on('submit', function (event) {
      event.preventDefault();

      const formData = {};
      form.serializeArray().forEach(item => {
        formData[item.name] = item.value;
      });

      $.ajax({
        url: `https://localhost:${port}/users/${editUser.id}`,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
          console.log('Data has been updated', response);
        },
        error: function (error) {
          console.error('Error with data update', error);
        },
      });
    });

    $('.container').append(form);

  }).fail(function (error) {
    console.error('Error with data receiving:', error);
  });

});
