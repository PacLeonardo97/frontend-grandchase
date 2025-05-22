export function getImageFromStorage(name: string) {
  return `https://iu6jcllkckt7xyvk.public.blob.vercel-storage.com/${name}`;
}

export function getImageEquip(name: string) {
  // caso seja capacete ou arma, mantem o nome
  if (name.includes('helm') || name.includes('weapon')) {
    return getImageFromStorage(name);
  }

  // caso não seja capacete ou arma, vai retornar o nome do item
  // Remove tudo até o primeiro "_"
  const index = name.indexOf('_');
  return index !== -1
    ? getImageFromStorage(name.slice(index + 1))
    : getImageFromStorage(name);
}
