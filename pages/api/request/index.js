export default async function handler(req, res) {
  const { mode } = req.query;
  switch(mode) {
    case 'regist_item':
      const response = await fetch('https://kajaaserver.com/kaidashi_php/sql_data.php?mode=regist_item', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(req.body)
      });
      const data_from_php = await response.json();
      res.status(200).json({data_from_php});
    break;
  }
}