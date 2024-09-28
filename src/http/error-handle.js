
module.exports = {wrap};

async function wrap(args, callback, apiName) {
  const whitespaceCount = 11 - apiName.length;
  let whitespaces = '';
  for (let i = 0; i < whitespaceCount; i++) {
    whitespaces += '-';
  }

  try {
    if (apiName !== 'middleware') console.log(`[API][${apiName}] ${whitespaces}> ${callback.name}()`);
    await callback(args);
  } catch (error) {
    console.error(error);
    return args.res.status(500).send({error: error.stack || error.message || error});
  }
}
