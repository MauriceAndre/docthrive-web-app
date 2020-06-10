import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Card } from "react-bootstrap";
import Section from "../../../common/Section";
import DataBlockLoader from "./../../../common/CustomLoader/DataBlockLoader";
import { initT, useT, t } from "../../../../utils/intl";
import { mapToViewModel } from "./../../../../utils/elementActivityUtils";
import { formatString } from "../../../../utils/templateUtils";
import { isEmpty } from "./../../../../utils/arrayUtils";
import { handleCatch } from "./../../../../utils/errorHandler";
import { getElementActivities } from "../../../../services/elementActivityService";
import style from "./ElementActivity.module.css";

const ElementActivity = ({ element, isTabSelected }) => {
  initT(useT(), "elementActivity");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getActivites = async () => {
      try {
        setLoading(true);
        const res = await getElementActivities(element._id);
        const activities = _.orderBy(res.data, ["createdAt"], ["desc"]);

        setActivities(activities);
      } catch (ex) {
        handleCatch(ex);
      } finally {
        setLoading(false);
      }
    };

    if (isTabSelected) getActivites();
  }, [element, isTabSelected]);

  let content = null;

  if (loading) {
    content = <DataBlockLoader />;
  } else if (isEmpty(activities)) {
    content = (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <div className={style["no-activities"]}>{t("noActivities")}</div>
      </div>
    );
  } else {
    content = activities.map((activity) => {
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
    });
  }

  return <Section className="overflow-auto p-2">{content}</Section>;
};

export default ElementActivity;
