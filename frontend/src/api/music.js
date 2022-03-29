import { instance } from "./index";
const baseURL = `${process.env.VUE_APP_API_URL}/music`;

// 추천 플레이리스트 가져오기
function getPlaylist() {
  let url = `${process.env.VUE_APP_API_URL}/main`;
  return instance.get(url);
}

// 음악정보 가져오기
function getMusicList(value, offset) {
  let url = `${baseURL}/${value}`;
  return instance.get(url, { params: { offset: offset } });
}

// 좋아요 리스트 추가
function addFavorite(item, uuid) {
  let url = `${baseURL}/add`;
  return instance.post(url, null, {
    params: {
      id: item.id,
      artist: item.artist,
      title: item.title,
      src: item.src,
      url: item.url,
      uuid: uuid,
    },
  });
}

//사용자의 좋아요 리스트 가져오기
function fetchFavorites(uuid) {
  let url = `${baseURL}/fetch`;
  return instance.post(url, null, { params: { uuid: uuid } });
}

// 좋아요 리스트에서 제거
function deleteFavorite(id, uuid) {
  let url = `${baseURL}/delete/${id}`;
  return instance.delete(url, { params: { uuid: uuid } });
}

// 좋아요 여부 확인
function isFavorite(id, uuid) {
  let url = `${baseURL}/fav`;
  return instance.post(url, null, { params: { id: id, uuid: uuid } });
}

export {
  getPlaylist,
  getMusicList,
  addFavorite,
  fetchFavorites,
  isFavorite,
  deleteFavorite,
};
