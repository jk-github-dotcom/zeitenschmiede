export function resolveAssetUrl(assets: any[], id?: string) {
  if (!id) return "";
  const asset = assets.find(a => a.sys.id === id);
  return asset ? "https:" + asset.fields.file.url : "";
}
