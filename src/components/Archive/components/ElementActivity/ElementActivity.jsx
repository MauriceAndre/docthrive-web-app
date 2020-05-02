import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Section from "../../../common/Section";
import { initT, useT, t } from "../../../../utils/intl";
import { mapToViewModel } from "./../../../../utils/elementActivityUtils";
import { formatString } from "../../../../utils/templateUtils";
import { isEmpty } from "./../../../../utils/arrayUtils";
import { getElementActivities } from "../../../../services/elementActivityService";
import style from "./ElementActivity.module.css";

const ElementActivity = ({ selectedElement, isTabSelected }) => {
  initT(useT(), "elementActivity");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivites = async () =>
      setActivities(await getElementActivities(selectedElement._id));

    if (isTabSelected) getActivites();
  }, [selectedElement, isTabSelected]);

  return (
    <Section className="overflow-auto p-2">
      {isEmpty(activities) ? (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <div className={style["no-activities"]}>{t("noActivities")}</div>
        </div>
      ) : (
        activities.map((activity) => {
          let { id, title, text, date } = mapToViewModel(activity);

          text = formatString(text);

          return (
            <Card key={id} className="my-3">
              <Card.Header className="d-flex align-items-center">
                <span>{title}</span>
                <small className="text-muted ml-auto">{date}</small>
              </Card.Header>
              <Card.Body>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Section>
  );
};

export default ElementActivity;
