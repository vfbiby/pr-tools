import type {PlasmoCSConfig} from "plasmo"
import {Box, Button, Drawer} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useStorage} from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export type IBloggerInfo = {
  "userId": string;
  "valid": number;
  "headPhoto": string;
  "name": string;
  "redId": string;
  "location": string;
  "homePageDisplay": number;
  "type": [],
  "personalTags": string[],
  "fansCount": number;
  "likeCollectCountInfo": number;
  "businessNoteCount": number;
  "picturePrice": number;
  "videoPrice": number;
  "lowerPrice": number;
  "userType": number;
  "showPrice": null,
  "pictureState": number;
  "videoState": number;
  "isCollect": boolean;
  "cooperateState": number;
  "pictureInCart": boolean;
  "videoInCart": boolean;
  "noteSign": {
    "userId": string;
    "name": string;
  },
  "contentTags": {
    "taxonomy1Tag": string;
    "taxonomy2Tags": string[];
  }[],
  "featureTags": string[];
  "gender": "女" | "男";
  "currentLevel": number;
  "nextLevel": number;
  "priceState": number;
  "tradeType": string;
  "clickMidNum": number;
  "clickMidNumMcn": number;
  "interMidNum": number;
  "fansNum": number;
  "efficiencyValidUser": number;
  "lowActive": boolean;
  "cooperType": number;
  "buyerType": number;
  "kolType": number;
  "mEngagementNum": number;
  "mEngagementNumMcn": number;
}

export type IBloggerInfoResponse = {
  "code": number;
  "msg": string;
  "guid": unknown;
  "success": boolean;
  data: IBloggerInfo;
}

export type IVisitBloggerInfo = {
  bloggerId: string,
  info: { bloggerInfo: Partial<IBloggerInfo> }
};

function isIterable(input) {
  if (input === null || input === undefined) {
    return false
  }

  return typeof input[Symbol.iterator] === 'function'
}

window.onload = () => {

  let db: IDBDatabase;

  const DBOpenRequest = window.indexedDB.open('bloggerInfo', 1);
  // Register two event handlers to act on the database being opened successfully, or not
  DBOpenRequest.onerror = (event) => {
    console.log('Error loading database.')
  };

  DBOpenRequest.onsuccess = (event) => {
    console.log('Database initialised.');

    // Store the result of opening the database in the db variable. This is used a lot below
    db = DBOpenRequest.result;

    // Run the displayData() function to populate the task list with all the to-do list data already in the IndexedDB
    // displayData();

  };

  DBOpenRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    db.onerror = (event) => {
      console.log('Error loading database.');
    };

    // Create an objectStore for this database
    const objectStore = db.createObjectStore('bloggerInfo', {keyPath: 'userId'});

    console.log('Object store created.');
  };

  // function add() {
  //   console.log("in add")
  //   const objectRequestStore = db.transaction(['bloggerInfo'], 'readwrite')
  //     .objectStore('bloggerInfo')
  //     .add({userId: 1, name: '张三', age: 24, email: 'zhangsan@example.com'});
  //
  //   objectRequestStore.onsuccess = function (event) {
  //     console.log('数据写入成功');
  //   };
  //
  //   objectRequestStore.onerror = function (event) {
  //     console.log('数据写入失败');
  //   }
  // }

  // add();

  function addData() {
    console.log('in adData')
    // Prevent default, as we don't want the form to submit in the conventional way

    // Stop the form submitting if any values are left empty.
    // This should never happen as there is the required attribute

    // Grab the values entered into the form fields and store them in an object ready for being inserted into the IndexedDB
    const newItem = [
      {userId: 2342, name: 'james'},
    ];
    console.log(newItem)

    // Open a read/write DB transaction, ready for adding the data
    const transaction = db.transaction(['bloggerInfo'], 'readwrite');

    // Report on the success of the transaction completing, when everything is done
    transaction.oncomplete = () => {
      console.log('Transaction completed: database modification finished.');

      // Update the display of data to show the newly added item, by running displayData() again.
      // displayData();
    };

    console.log("--------------------")
    // Handler for any unexpected error
    transaction.onerror = () => {
      console.log(`Transaction not opened due to error: ${transaction.error}`);
    };

    // Call an object store that's already been added to the database
    const objectStore = transaction.objectStore('bloggerInfo');
    console.log(objectStore.indexNames);
    console.log(objectStore.keyPath);
    console.log(objectStore.name);
    console.log(objectStore.transaction);
    console.log(objectStore.autoIncrement);

    // Make a request to add our newItem object to the object store
    const objectStoreRequest = objectStore.add(newItem[0]);
    objectStoreRequest.onsuccess = (event) => {

      // Report the success of our request
      // (to detect whether it has been succesfully
      // added to the database, you'd look at transaction.oncomplete)
      console.log('Request successful.');

    };
  }

  addData()
}

function BloggerPopup(props: { open: boolean, onClose: () => void }) {
  const [bloggerInfo, setBloggerInfo] = useState<IBloggerInfo>(null)
  const [visitBlogger, setVisitBlogger] = useStorage<IVisitBloggerInfo[]>('visitBlogger');

  const addBlogger = async () => {
    await setVisitBlogger([...visitBlogger, {bloggerId: 'new-id', info: {bloggerInfo: {name: 'james'}}}])
  };

  useEffect(() => {
    if (visitBlogger !== undefined && !bloggerInfo) {
      if (visitBlogger === null) {
        setVisitBlogger([{
          bloggerId: bloggerInfo.userId,
          info: {bloggerInfo: {name: bloggerInfo.name}}
        }])
        return;
      }
      const existBlogger = visitBlogger.find(blogger => blogger.bloggerId === bloggerInfo.userId);
      if (existBlogger) return;
      setVisitBlogger([...visitBlogger, {
        bloggerId: bloggerInfo.userId,
        info: {bloggerInfo: {name: bloggerInfo.name}}
      }])

    }
  }, [visitBlogger, bloggerInfo]);

  const onMessageListener = useCallback(
    async (e: any) => {
      const type = e.detail.type
      if (type === "BLOGGER_INFO") {
        const response = JSON.parse(e.detail.responseText) as IBloggerInfoResponse;
        if (response.code === 0) {
          let data = response.data;
          setBloggerInfo(data)
        } else
          console.log("blogger info getting error!")
      }
    }, []);

  useEffect(() => {
    window.addEventListener("FROM_INJECTED", onMessageListener, false)
    return () => {
      window.removeEventListener("FROM_INJECTED", onMessageListener)
    }
  }, [])

  async function clearStorage() {
    await setVisitBlogger(null)
  }

  return <Drawer
    anchor="bottom"
    open={props.open}
    onClose={props.onClose}
    PaperProps={{
      sx: {width: "100%", height: "60%"}
    }}
  >
    <Box sx={{height: "100%"}}>
      <div style={{height: "calc(100% - 0px)", width: "100%"}}>
        <Button onClick={addBlogger}>hello</Button>
        <Button onClick={clearStorage}>delete</Button>
        {bloggerInfo && <>
          <div>
            <span>粉丝总数:</span><span>{bloggerInfo.fansCount}</span>
          </div>
          <div>
            <span>{bloggerInfo?.userId}</span>
          </div>
          <div>{bloggerInfo?.name}</div>
          <div>{bloggerInfo?.clickMidNum}</div>
        </>}
      </div>
    </Box>
  </Drawer>;
}

const BloggerFloat = () => {
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div style={{margin: "200px 0 0 10px"}}>
      {!openPopup && <button onClick={() => setOpenPopup(true)}>show</button>}
      <BloggerPopup open={openPopup} onClose={() => setOpenPopup(false)}/>
    </div>
  )
}

export default BloggerFloat
