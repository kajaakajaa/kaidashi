export default async function handler(req, res) {
  const { mode } = req.query;

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
      const response_regist = await fetch('https://kajaaserver.com/kaidashi_php/sql_data.php?mode=regist_item', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-type': 'application/json'}
      });
      const regist_data_from_php = await response_regist.json();
      res.status(200).json({regist_data_from_php});
    break;
  }
}