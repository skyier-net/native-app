import React, { useState } from "react";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel,
  IonItem, IonSelect, IonSelectOption, IonButton, IonToast
} from "@ionic/react";

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("public");
  const [emailToAdd, setEmailToAdd] = useState<string>("");
  const [members, setMembers] = useState<{ email: string, role: string }[]>([]);
  const [defaultRole, setDefaultRole] = useState<string>('Viewer');
  const [error, setError] = useState<string>("");

  const isValidEmailToAdd = (email: string): boolean => {
    email = email.toLowerCase();
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email) && !members.some(member => member.email.toLowerCase() === email);
  };

  const handleAddUser = () => {
    if (isValidEmailToAdd(emailToAdd)) {
      setMembers(prev => [{ email: emailToAdd.toLowerCase(), role: 'Viewer' }, ...prev]);
      setEmailToAdd("");
    }
  };

  const updateMemberRole = (email: string, newRole: string) => {
    setMembers(prev => prev.map(member =>
      member.email === email ? { ...member, role: newRole } : member
    ));
  };

  const removeMember = (emailToRemove: string) => {
    setMembers(prev => prev.filter(member => member.email !== emailToRemove));
  };

  const handleCreateGroup = () => {
    if (title.length < 7) setError("Title should be at least 7 characters long.");
    else if (title.length > 50) setError("Title should be maximal 50 characters long.");
    else if (description.length < 20) setError("Description should be at least 20 characters long.");
    else if (description.length > 250) setError("Description should be maximal 250 characters long.");
    else {
      // Add logic if necessary before sending data
      console.log({ title, description, visibility, defaultRole: visibility === 'private' ? null : defaultRole, members });
      setError("");
    }
  };

  return (
    <IonPage className="pt-[90px]">
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Title</IonLabel>
          <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} maxlength={50} minlength={7} required />
        </IonItem>

        <IonItem>
          <IonLabel>Description</IonLabel>
          <IonInput value={description} onIonChange={e => setDescription(e.detail.value!)} maxlength={250} minlength={20} required />
        </IonItem>

        <IonItem>
          <IonLabel>Group visibility</IonLabel>
          <IonSelect value={visibility} onIonChange={e => setVisibility(e.detail.value)}>
            <IonSelectOption value="public">Public</IonSelectOption>
            <IonSelectOption value="unlisted">Unlisted</IonSelectOption>
            <IonSelectOption value="private">Private</IonSelectOption>
          </IonSelect>
        </IonItem>

        {visibility === "public" &&
          <IonItem>
            <IonLabel>Everyone joined is</IonLabel>
            <IonSelect value={defaultRole} onIonChange={e => setDefaultRole(e.detail.value)}>
              <IonSelectOption value="Viewer">Viewer</IonSelectOption>
              <IonSelectOption value="Member">Member</IonSelectOption>
            </IonSelect>
          </IonItem>
        }

        {visibility === "unlisted" &&
          <IonItem>
            <IonLabel>Everyone with the link is</IonLabel>
            <IonSelect value={defaultRole} onIonChange={e => setDefaultRole(e.detail.value)}>
              <IonSelectOption value="Viewer">Viewer</IonSelectOption>
              <IonSelectOption value="Member">Member</IonSelectOption>
            </IonSelect>
          </IonItem>
        }


        <IonItem>
          <label>Add Member</label>
          <input
            value={emailToAdd}
            onChange={e => setEmailToAdd(e.target.value)}
            placeholder="Enter email"
            className="outline-none ml-2 bg-transparent"
          />
        </IonItem>
        {isValidEmailToAdd(emailToAdd) && (
          <div
            className="cursor-pointer p-[8px] bg-[#f1f1f1] dark:bg-[#292929]"
            onClick={handleAddUser}
          >
            Add: {emailToAdd.toLowerCase()}
          </div>
        )}

        <div className="mt-2">
          {members.map(member => (
            <IonItem key={member.email} lines="full">
              <IonLabel>{member.email}</IonLabel>
              <IonSelect
                placeholder="Select Role"
                value={member.role}
                onIonChange={(event) => {
                  updateMemberRole(member.email, event.detail.value);
                }}
              >
                <IonSelectOption value="Viewer">Viewer</IonSelectOption>
                <IonSelectOption value="Member">Member</IonSelectOption>
                <IonSelectOption value="Admin">Admin</IonSelectOption>
              </IonSelect>
              <IonButton fill="clear" slot="end" onClick={() => removeMember(member.email)} style={{ fontSize: '20px' }}>x</IonButton>
            </IonItem>
          ))}
        </div>
        <IonToast
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          message={error}
          duration={5000}
          color="danger"
        />

        <div className="flex justify-center items-center mt-[20px]">

          <div className="w-1/2 md:w-1/3 lg:w-1/4">
            <IonButton type="submit" expand="full" shape="round" onClick={handleCreateGroup}>
              Create Group
            </IonButton>
          </div>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Create;