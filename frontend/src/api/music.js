import { instance } from "./index";

// 추천 플레이리스트 가져오기
function getPlaylist() {
  let url = "http://localhost:3000/api/main";
  return instance.get(url);
}

// 음악정보 가져오기
function getMusicList(value) {
  let url = `http://localhost:3000/api/music/${value}`;
  return instance.get(url);
}

// 좋아요 리스트 추가
function addFavorite(item, uuid) {
  let url = "http://localhost:3000/api/music/add";
  return instance.post(url, null, {
    params: {
      id: item.id,
      artist: item.artist,
      title: item.title,
      src: item.src,
      uuid: uuid,
    },
  });
}

// 좋아요 리스트에서 제거
function deleteFavorite(id) {
  let url = `http://localhost:3000/api/music/${id}`;
  return instance.delete(url);
}

// 좋아요 여부 확인
function isFavorite(id) {
  let url = `http://localhost:3000/api/music/fav/${id}`;
  return instance.get(url);
}

export { getPlaylist, getMusicList, addFavorite, isFavorite, deleteFavorite };
