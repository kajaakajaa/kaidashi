export default async function handler(req, res) {
  const { mode } = req.query;
  let response = '';

  switch(mode) {
    case 'set_list_data':
      const response_setList = await fetch('https://kajaaserver.com/kaidashi_php/sql_data.php?mode=set_list_data', {
        method: 'POST',
        body: JSON.stringify(req.body)
      });
      const item_data_from_php = await response_setList.json();
      res.status(200).json({item_data_from_php});
    break;

    case 'regist_item':
        response = await fetch('https://kajaaserver.com/kaidashi_php/sql_data.php?mode=regist_item', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-type': 'application/json'}
      });
      const regist_data_from_php = await response.json();
      res.status(200).json({regist_data_from_php});
    break;

    case 'delete_item':
      fetch('https://kajaaserver.com/kaidashi_php/sql_data.php?mode=delete_item', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-type': 'application/json'}
      })
      // const delete_result = await response.json();
      // res.status(200).json({delete_result});
    break;
  }
}