// eslint-disable-next-line func-names
export default (handleFn) => function (req, res, next) {
  Promise.resolve(handleFn(req, res, next))
    .catch((err) => next(err));
};
