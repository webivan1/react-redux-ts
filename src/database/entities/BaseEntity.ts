import firebase from "firebase";

// Connect
import connect from "../connect";

abstract class BaseEntity {

  protected connect = connect;
  protected collectionName: string = '';

  public ref(): firebase.database.Reference {
    return connect.ref(`/${this.collectionName}`);
  }

  public refId(id: string): firebase.database.Reference {
    return connect.ref(`/${this.collectionName}/${id}`);
  }
}

export default BaseEntity;