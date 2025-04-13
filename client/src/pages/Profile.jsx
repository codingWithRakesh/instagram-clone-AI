import React, { useState } from 'react'
import PostsProfile from '../components/PostsProfile'
import SavePost from '../components/SavePost'
import TaggedPost from '../components/TaggedPost'
import { NavLink, useParams } from 'react-router-dom'
import ProfileShow from '../components/ProfileShow'
import ArchiveStorySelected from '../components/ArchiveStorySelected'
import { useAuthStore } from '../store/authStore.js'

const Profile = () => {
  const [tags, setTags] = useState("post")
  const { profile } = useParams();
  const user = useAuthStore((state) => state.user);
  return (
    <div className="second Contaner">
      <div className="profileContaner">
        <ProfileShow/>

        <div className="profile_box1">
          <ArchiveStorySelected/>
        </div>
        
        <div className="ImagePro">
          <div className="imaProNavigate">
            <div className={`posataC ${tags == "post" ? `borTop` : ``}`} id="postId" onClick={() => setTags("post")}>
              <div id="postIcon">
                {tags == "post" ? <svg aria-label="" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg> : <svg aria-label="" class="x1lliihq x1n2onr6" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>}
              </div>
              <p id="pssId" className={tags == "post" ? `cBlack` : ``}>POSTS</p>
            </div>
            {user.userName == profile && <div className={`posataC ${tags == "saved" ? `borTop` : ``}`} id="savedId" onClick={() => setTags("saved")}>
              <div id="saveIcon">
                {tags != "saved" ? <svg aria-label="" className="x1lliihq x1n2onr6" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg> : <svg aria-label="" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>}
              </div>
              <p id="saaId" className={tags == "saved" ? `cBlack` : ``}>SAVED</p>
            </div>}
            <div className={`posataC ${tags == "tagged" ? `borTop` : ``}`} id="taggedId" onClick={() => setTags("tagged")}>
              <div id="taggedIcon">
                {tags != "tagged" ? <svg aria-label="" className="x1lliihq x1n2onr6" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg> : <svg aria-label="" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>}
              </div>
              <p id="taaId" className={tags == "tagged" ? `cBlack` : ``}>TAGGED</p>
            </div>
          </div>

          {tags == "post" ? <PostsProfile /> : tags == "saved" ? <SavePost /> : tags == "tagged" ? <TaggedPost /> : ""}


        </div>

        <div className="footerCOn">
          <p className="footerCOn_1">
            <span>Meta</span> <span>About</span> <span>Blog</span> <span>Jobs</span> <span>Help</span> <span>API</span> <span>Privacy</span> <span>Terms</span> <span>Locations</span> <span>Instagram</span> <span>Lite</span> <span>Threads</span> <span>Contact Uploading & Non-Users</span> <span>Meta Verified</span>

          </p>
          <div className="footerCOn_2">
            <select>
              <option value="en">English</option>
              <option value="af">Afrikaans</option>
              <option value="ar">العربية</option>
              <option value="cs">Čeština</option>
              <option value="da">Dansk</option>
              <option value="de">Deutsch</option>
              <option value="el">Ελληνικά</option>
              <option value="en-gb">English (UK)</option>
              <option value="es">Español (España)</option>
              <option value="es-la">Español</option>
              <option value="fa">فارسی</option>
              <option value="fi">Suomi</option>
              <option value="fr">Français</option>
              <option value="he">עברית</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ms">Bahasa Melayu</option>
              <option value="nb">Norsk</option>
              <option value="nl">Nederlands</option>
              <option value="pl">Polski</option>
              <option value="pt-br">Português (Brasil)</option>
              <option value="pt">Português (Portugal)</option>
              <option value="ru">Русский</option>
              <option value="sv">Svenska</option>
              <option value="th">ภาษาไทย</option>
              <option value="tl">Filipino</option>
              <option value="tr">Türkçe</option>
              <option value="zh-cn">中文(简体)</option>
              <option value="zh-tw">中文(台灣)</option>
              <option value="bn">বাংলা</option>
              <option value="gu">ગુજરાતી</option>
              <option value="hi">हिन्दी</option>
              <option value="hr">Hrvatski</option>
              <option value="hu">Magyar</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ml">മലയാളം</option>
              <option value="mr">मराठी</option>
              <option value="ne">नेपाली</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="si">සිංහල</option>
              <option value="sk">Slovenčina</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="ur">اردو</option>
              <option value="vi">Tiếng Việt</option>
              <option value="zh-hk">中文(香港)</option>
              <option value="bg">Български</option>
              <option value="fr-ca">Français (Canada)</option>
              <option value="ro">Română</option>
              <option value="sr">Српски</option>
              <option value="uk">Українська</option>
            </select>
            <p>© 2023 Instagram from Meta</p>
          </div>
        </div>
        <div className="spance"></div>
      </div>
    </div>
  )
}

export default Profile