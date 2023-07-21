import { useState, useCallback } from 'react';

export default () => {
  const [bodyType, setBodyType] = useState(0);
  const [rawType, setRawType] = useState('JSON');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [paramsData, setParamsData] = useState([]);
  const [editableKeys, setEditableKeys] = useState(() => paramsData.map((item: any) => item.id));
  const [headers, setHeaders] = useState([]);
  const [headersKeys, setHeadersKeys] = useState(() => headers.map((item: any) => item.id));
  const [loading, setLoading] = useState(false);
  const [respResult, setRespResult] = useState({});
  const [bodyValue, setBodyValue] = useState({});

  const upBodyType = useCallback((value) => setBodyType(value), []);
  const upRawType = useCallback((value) => setRawType(value), []);
  const upMethod = useCallback((value) => setMethod(value), []);
  const upUrl = useCallback((value) => setUrl(value), []);
  const upParamsData = useCallback((value) => setParamsData(value), []);
  const upEditableKeys = useCallback((value) => setEditableKeys(value), []);
  const upHeaders = useCallback((value) => setHeaders(value), []);
  const upHeadersKeys = useCallback((value) => setHeadersKeys(value), []);
  const upLoading = useCallback((value) => setLoading(value), []);
  const upResponse = useCallback((value) => setRespResult(value), []);
  const upBodyValue = useCallback((value) => setBodyValue(value), []);

  return {
    bodyType,
    rawType,
    method,
    url,
    paramsData,
    editableKeys,
    headers,
    headersKeys,
    loading,
    respResult,
    bodyValue,
    upBodyType,
    upRawType,
    upMethod,
    upUrl,
    upParamsData,
    upEditableKeys,
    upHeaders,
    upHeadersKeys,
    upLoading,
    upResponse,
    upBodyValue,
  };
};
