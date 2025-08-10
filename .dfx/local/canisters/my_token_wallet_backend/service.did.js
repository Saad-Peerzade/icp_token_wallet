export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get_balance' : IDL.Func([], [IDL.Nat64], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
